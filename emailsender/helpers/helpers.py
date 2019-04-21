import requests
from authentication.models import User, UserSocialCredentials


def renewToken(user):
    """
    Function to renew access token.
    """
    renew_url = 'https://www.googleapis.com/oauth2/v4/token'
    social_creadetials = UserSocialCredentials.object.get(user=user)
    data = {
        "client_id": '705813183307-hminde5i1ejhm790gl6t2ct0j6n7vft0.apps.googleusercontent.com',
        "client_secret": 'NCxFWXMsV4fgU36zmuh0fk1N',
        "grant_type": "refresh_token",
        "refresh_token": social_creadetials.refresh_token
    }
    res = requests.post(renew_url, data=data)
    access_token = res.json()['access_token']
    social_creadetials.access_token = access_token
    social_creadetials.save()
    return access_token
