import json
import os
import psycopg2  # noqa


def handler(event: dict, context) -> dict:
    """Приём заявок с формы лендинга ремонта балконов"""
    
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'headers': cors_headers, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body') or '{}')
    name = (body.get('name') or '').strip()
    phone = (body.get('phone') or '').strip()
    email = (body.get('email') or '').strip() or None
    address = (body.get('address') or '').strip() or None

    if not name or not phone:
        return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'Имя и телефон обязательны'})}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO balkon_leads (name, phone, email, address) VALUES (%s, %s, %s, %s) RETURNING id",
        (name, phone, email, address)
    )
    lead_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'success': True, 'id': lead_id})
    }