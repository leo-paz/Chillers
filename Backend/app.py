from GeoFire.geofire import GeoFire
from flask import Flask, jsonify
import pyrebase
import requests
import os

# hack to fix quote encoding in pyrebase lib
def noquote(s):
    return s
pyrebase.pyrebase.quote = noquote

# constants
rad = 6
maps_api_key=os.getenv('maps_api_key')
firebase_api_key=os.getenv('firebase_api_key')
firebase_auth_domain=os.getenv('firebase_auth_domain')
firebase_database_URL=os.getenv('firebase_database_URL')
firebase_storage_bucket=os.getenv('firebase_storage_bucket')


def get_user(id):
    r = requests.get('https://uottawahack3.firebaseio.com/Locations.json?orderBy="id"&equalTo="{}"'.format(id)).json()
    return list(r.values())[0]


def calc_road_dist(user1, user2):
    r = requests.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins={}&destinations={}&key={}'
                     .format(str(user1['address']), str(user2['address']), maps_api_key)).json()
        
    return r['rows'][0]['elements'][0]


app = Flask(__name__)

@app.route('/nearest_chiller/<id>/')
def get_nearest_chiller(id):
    user = get_user(id)
    
    geofire = GeoFire(lat=user['lat'],
                      lon=user['lon'],
                      radius=rad,
                      unit='km').config_firebase(
        api_key=firebase_api_key,
        auth_domain=firebase_auth_domain,
        database_URL=firebase_database_URL,
        storage_bucket=firebase_storage_bucket
    )
    nearby_users = geofire.query_nearby_objects(query_ref='Locations', geohash_ref='geohash')
    chillers = []
    
    for nearby_user in nearby_users.values():
        if nearby_user['type'] != 'chiller' or nearby_user['id'] == id:
            continue
    
        nearby_user.update(calc_road_dist(user, nearby_user))
        chillers.append(nearby_user)
        
    nearest_chiller = sorted(chillers, key=lambda i: i['distance']['value'])[0]
    
    return jsonify({'id': nearest_chiller['id'], 
                    'dist': nearest_chiller['distance']['text'],
                    'time': nearest_chiller['duration']['text']})


@app.route('/find_lon_lat/<id>/')
def get_lon_lat(id):
    user = get_user(id)
    return jsonify({'lon': user['lon'], 'lat': user['lat']})


if __name__ == '__main__':
    app.run(debug=True)