from fastapi import Query, APIRouter

from controllers import GeolocationController

router = APIRouter()


@router.get("/reverse-geocode")
async def reverse_geocode(lat: float = Query(...), lng: float = Query(...)) -> dict:
    return await GeolocationController().reverse_geocode(lat=lat, lng=lng)


@router.get("/health")
def health_check() -> str:
    return "Healthy"
