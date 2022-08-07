import os
from datetime import datetime
from flask import Flask, jsonify, g

import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask("app", static_folder='build/', static_url_path='')


@app.route('/')
def get_index():
    return app.send_static_file('index.html')


@app.route('/api/dropoffs/<int:start>/<int:end>')
def get_rides(start, end):
    ms_per_second = 1000
    start_param = datetime.fromtimestamp(start / ms_per_second)
    end_param = datetime.fromtimestamp(end / ms_per_second)

    query = """
        select 
            end_location_lat, end_location_long, sum(1) as dropoff_count
        from rides 
        where completed_on >= (%s)
        and completed_on <= (%s)
        group by end_location_lat, end_location_long;
    """
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute(query, (start_param, end_param))
    response = cur.fetchall()

    return jsonify(response)


def get_conn():
    if 'conn' not in g:
        db_user = os.environ['DB_USER']
        db_password = os.environ['DB_PASSWORD']
        db_host = os.environ['DB_HOST']
        g.conn = psycopg2.connect(
            f"""
                dbname='main' 
                user='{db_user}' 
                host='{db_host}' 
                password='{db_password}'
            """
        )

    return g.conn


@app.teardown_appcontext
def teardown_db(error):
    if hasattr(g, 'conn'):
        g.conn.close()
