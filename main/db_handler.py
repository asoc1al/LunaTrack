import psycopg2

def get_data_from_db(query, params=None):
    conn = psycopg2.connect(
        dbname="lunatrack",
        user="django_admin",
        password="108989898",
        host="localhost",
        port="5432"
    )
    cursor = conn.cursor()
    cursor.execute(query, params)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results

def insert_data_into_db(query, params):
    conn = psycopg2.connect(
        dbname="lunatrack",
        user="django_admin",
        password="108989898",
        host="localhost",
        port="5432"
    )
    cursor = conn.cursor()
    cursor.execute(query, params)
    conn.commit()
    cursor.close()
    conn.close()