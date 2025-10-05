import httpx
from fastapi import HTTPException

from settings import URL, API_KEY


class GeolocationController:
    async def reverse_geocode(self,lat: str, lng: str) -> dict:
        url = f"{URL}?latlng={lat},{lng}&api_key={API_KEY}"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            if response.status_code != 200:
                raise HTTPException(status_code=500, detail="Failed to fetch server")
            return response.json()
