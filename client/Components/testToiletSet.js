// schema is:
// bathroomId,
// bathroomCoords,
// imageUrl,
// imageTitle,
// descriptionTitle,
// descriptionBody,
// toiletAddress
// toiletAddress2

const testToiletSet = [
  {
    bathroomId: 1,
    bathroomCoords: [40.7415095, -73.9569751],
    imageUrl: null,
    imageTitle: null,
    descriptionTitle: 'A toilet for rent.',
    descriptionBody: 'Buy yourself some toilet time. Don\'t leave a mess.',
    toiletAddress: 'Some Raiload Tracks down at Long Island City, Queens, NYC',
    toiletAddress2: null,
  },
  {
    bathroomId: 2,
    bathroomCoords: [40.7477112,-73.9563172],
    imageUrl: null,
    imageTitle: null,
    descriptionTitle: `Sit and think.`,
    descriptionBody: `It's less like a bathroom and more like a meditation retreat.`,
    toiletAddress: `4545 Center Blvd, Long Island City, NY 11109`,
    toiletAddress2: `Apt 9001`,
  },
  {
    bathroomId: 1,
    bathroomCoords: [40.7472011, -73.9566542],
    imageUrl: null,
    imageTitle: null,
    descriptionTitle: 'A place to go',
    descriptionBody: 'A place to go when you need a place to go.',
    toiletAddress: '4610 Center Blvd, Long Island City, NY 11109',
    toiletAddress2: `Apt 2`,
  },
  {
    bathroomId: 1,
    bathroomCoords: [40.74257401667589, -73.96178139585714],
    imageUrl: null,
    imageTitle: null,
    descriptionTitle: 'A great view of the East River',
    descriptionBody: 'A great view of the East River because the bathroom is in the river.',
    toiletAddress: 'East River, NYC',
    toiletAddress2: null,
  },
  {
    bathroomId: 1,
    bathroomCoords: [40.74249680676719, -73.96053128637011],
    imageUrl: null,
    imageTitle: null,
    descriptionTitle: 'Potty in the Park',
    descriptionBody: `You're in the park. There is no roof. There are no walls. Total freedom.`,
    toiletAddress: 'A park in LIC',
    toiletAddress2: `Grass and fresh air`,
  },
  {
    bathroomId: 1,
    bathroomCoords: [40.73974725150603, -73.95925757295892],
    imageUrl: null,
    imageTitle: null,
    descriptionTitle: 'Bathroom @ CityHarvest',
    descriptionBody: `Yes, this is a bathroom at CityHarvest. Yes, I know it's weird. Pay me.`,
    toiletAddress: 'LIC City Harvest',
    toiletAddress2: `Walk In Freezer`,
  },
];

export default testToiletSet;