export type JourneyWorld = "forest" | "ruins" | "sky";

export type Journey = {
  slug: string;
  world: JourneyWorld;
  to: "/enchanted-forest" | "/ancient-ruins" | "/sky-kingdom";
  label: string;
  tagline: string;
  blurb: string;
  story: string[];
  highlights: { title: string; text: string }[];
};

export const journeys: Journey[] = [
  {
    slug: "enchanted-forest",
    world: "forest",
    to: "/enchanted-forest",
    label: "Enchanted Forest",
    tagline: "Where the light remembers your name.",
    blurb:
      "A living woodland of fireflies and ancient canopies — the first world of the journey.",
    story: [
      "Past the last ordinary path, the forest begins to glow. Fireflies drift between blackwood trunks like slow stars, and every clearing hums with a light that seems to notice you back.",
      "Travellers who walk quietly here say the trees lean closer to listen. The canopy keeps its own time — dawn arrives when the forest decides, not before.",
    ],
    highlights: [
      {
        title: "Firefly Canopy",
        text: "Thousands of drifting lights that gather around stillness and scatter at sudden motion.",
      },
      {
        title: "Whispering Glades",
        text: "Clearings where sound travels strangely — a word spoken once returns as a chorus.",
      },
      {
        title: "The Slow Dawn",
        text: "A sunrise that moves through the trees in person, visible as a walking edge of gold.",
      },
    ],
  },
  {
    slug: "ancient-ruins",
    world: "ruins",
    to: "/ancient-ruins",
    label: "Ancient Ruins",
    tagline: "Stone keeps what memory drops.",
    blurb:
      "Fallen columns and sun-baked terraces of a city that outlasted its own name.",
    story: [
      "No map agrees on who built the city, only that it was enormous and that it left in a hurry. Columns lie where they fell, staircases climb to platforms that no longer exist, and the dust moves even when the air is still.",
      "At midday the ruins are silent. Toward evening, when the light goes amber and long, the stones throw shadows that look almost like crowds returning home.",
    ],
    highlights: [
      {
        title: "The Broken Colonnade",
        text: "A hundred fallen pillars, each carved with a script no living scholar can read.",
      },
      {
        title: "Terraces of Dust",
        text: "Stepped platforms where the wind writes and erases patterns all afternoon.",
      },
      {
        title: "The Unnamed Gate",
        text: "The one arch still standing — the tradition is to pass through it without speaking.",
      },
    ],
  },
  {
    slug: "sky-kingdom",
    world: "sky",
    to: "/sky-kingdom",
    label: "Sky Kingdom",
    tagline: "A realm with the ground optional.",
    blurb:
      "Floating islands and cloud harbours above the weather — the crown of the journey.",
    story: [
      "Above the cloud line the islands drift in slow formation, each carrying its own weather. Bridges of pale stone span gaps that rearrange themselves overnight, and the harbours moor clouds the way other ports moor ships.",
      "The kingdom's clocks are sundials, and they are always right — there is nothing up here to cast a shadow but the islands themselves.",
    ],
    highlights: [
      {
        title: "The Drifting Isles",
        text: "Landmasses that migrate with the seasons, gardens and all.",
      },
      {
        title: "Cloud Harbours",
        text: "Docks where cumulus ships are loaded with rain bound for the world below.",
      },
      {
        title: "The Sun Court",
        text: "The highest island, where noon lasts an extra hour every day.",
      },
    ],
  },
];

export function getJourney(slug: string) {
  return journeys.find((j) => j.slug === slug);
}
