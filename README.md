I am creating sake API and would like to show which sake comes from which part of Japan on a map.

I am using no relational database, MongoDB.
I can technically store all data in single collection.

Collection would be areas, breweries, and brands.
My API would fetch brands based on English area name like "hokkaido".


Collection1: areas
- 47 districts(rom hokkaido to okinawa) plus one others

areas: [
  {
    "id": 1,
    "name": "北海道",
    "en:: "hokkaido"
  }
]
=> 48 categories are fixed and they never will grow

Collection2: breweries
- Size are not fixed, it can grow
- Breweries must have areaId

"breweries": [
    {
      "id": 1796,
      "name": "麻原酒造",
      "areaId": 9
    }]


Collection3: brands
- brands must have breweryId
- Size are not fixed, it can grow

"brands": [
    {
      "id": 4558,
      "name": "越の一",
      "breweryId": 1832
    }]

