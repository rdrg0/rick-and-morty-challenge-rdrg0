function countCharsInName(char, resources) {
  return resources.reduce((acc, resource) => (acc + resource.name.toLowerCase().split(char).length - 1), 0)
}

export function charCounter(characters, locations, episodes) {
  return [
    {
      char: "l",
      count: countCharsInName('l', locations),
      resource: "location"
    },
    {
      char: "e",
      count: countCharsInName('e', episodes),
      resource: "episode"
    },
    {
      char: "c",
      count: countCharsInName('c', characters),
      resource: "character"
    }
  ]

}
function getLocations(episodeCharacters, characters) {
  const charactersLocations = episodeCharacters.map(episodeCharacter => {
    const character = characters.find(character => character.url === episodeCharacter)
    return character.origin.name
  })
  // @ts-ignore
  return [...new Set(charactersLocations)]
}
export function getCharactersLocationFromEpisodes(characters, episodes) {
  return episodes.map(episode => {
    const locations = getLocations(episode.characters, characters)
    return {
      name: episode.name,
      episode: episode.episode,
      count: locations.length,
      locations: locations
    }
  })
}
export function msFormatter(time) {
  const ms = time % 1000;
  const secs = (time - ms) / 1000;
  return (`${secs}s${ms}ms`)
}
export function inTime(time) {
  return time < 3000
}

export function range(endAt, startAt) {
  // @ts-ignore
  return [...Array(endAt - startAt + 1).keys()].map(i => i + startAt);
}

export const exportedForTesting = { countCharsInName }