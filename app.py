from flask import Flask, jsonify
import pandas as pd

app = Flask("app", static_folder='build/', static_url_path='')
df = pd.read_parquet('./RideAustin_Weather.parquet')


@app.route('/')
def get_index():
    return app.send_static_file('index.html')


@app.route('/api/dropoffs/<int:start>/<int:end>')
def rides(start, end):
    start, end = (start*1000000, end*1000000)
    time_filter = df.completed_on.astype(int).between(start, end)
    result = (
        df[time_filter]
        .groupby(['end_location_lat', 'end_location_long'])
        .size()
        .to_frame('dropoff_count')
        .reset_index().reset_index()
        .to_dict('records')
    )

    return jsonify(result)
