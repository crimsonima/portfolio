const underDev = {
  texts: [
    [
      "Oops, looks like this part isn’t ready yet.",
      "Want to check out the other sections?",
    ],
    [
      "Oh no, this bit is still under construction.",
      "How about exploring something else?",
    ],
    ["Yikes, this area is a work in progress.", "Care to try another part?"],
    [
      "Uh-oh, seems like this section isn’t done yet.",
      "Shall we look at something else?",
    ],
    [
      "Whoops! This part’s still in the making.",
      "How about checking out other areas?",
    ],
    [
      "Hmm, this bit isn’t quite ready for visitors.",
      "Want to explore the rest?",
    ],
    [
      "Oopsie, this section needs a little more time.",
      "Shall we see what else is here?",
    ],
    [
      "Oh dear, this part’s not functional yet.",
      "How about trying something else?",
    ],
    [
      "My bad! This feature isn’t set up yet.",
      "Care to explore the rest instead?",
    ],
    [
      "Whoops, seems like I forgot to finish this bit.",
      "Would you like to explore another part?",
    ],
  ],
  options: [{ label: "Go back", nextState: "nima" }],
};

const dialogues: {
  [key: string]: {
    texts: string[][];
    options: { label: string; nextState: keyof typeof dialogues }[];
  };
} = {
  intro: {
    texts: [
      ["Hey! How's it going?", "What brought you here?"],
      ["Howdy There!", "You look lost"],
      ["Hello, traveler!", "Looking for something specific?"],
      ["Welcome aboard!", "What can I show you today?"],
      ["Hey! Nice to see you.", "Care to explore?"],
      ["Hey there!", "What adventure are we embarking on today?"],
      ["Ah, a visitor!", "What brings you to this corner?"],
      ["Well, hello there!", "How can I guide you?"],
    ],
    options: [
      { label: "I want to know about Nima", nextState: "nima" },
      { label: "Who are you?", nextState: "pixelGuy" },
    ],
  },
  nima: {
    texts: [
      ["He's alright, I think.", "What would you like to know about him?"],
      ["Seems like a decent guy.", "Anything specific you’re curious about?"],
      [
        "He's pretty easy to get along with.",
        "What do you want to find out about him?",
      ],
      [
        "I don’t know him super well, but he seems nice.",
        "What do you want to know about him?",
      ],
      ["He’s just a regular guy.", "Anything you’d like to ask about him?"],
      ["I think he’s pretty chill.", "What do you have in mind about him?"],
      [
        "He’s fine, nothing out of the ordinary.",
        "Got something specific you'd like to ask?",
      ],
      ["He's easygoing, from what I can tell.", "What are you curious about?"],
      ["He seems alright to me.", "What would you like to know about him?"],
    ],
    options: [
      { label: "Go back", nextState: "intro" },
      { label: "Any insight into his studies?", nextState: "education" },
      { label: "What has he worked on so far?", nextState: "projects" },
      { label: "Any work experience on his end?", nextState: "experience" },
      { label: "Let's get personal!", nextState: "personal" },
    ],
  },
  pixelGuy: {
    texts: [
      [
        "I’m just a little pixel guy, nothing special.",
        "I’ve been assigned to share the secrets of Nima’s projects.",
      ],
      [
        "Oh, me? Just a tiny creation in a big world.",
        "I’m here to tell you all about Nima’s adventures.",
      ],
      [
        "I’m just a simple pixel character doing my job.",
        "Nima thought I’d be good at explaining things.",
      ],
      [
        "I’m no one important, just some pixels and code.",
        "But I know a thing or two about what Nima’s been working on.",
      ],
      [
        "Don’t mind me; I’m just a humble pixel being.",
        "I’m here to talk about Nima’s latest ideas.",
      ],
      [
        "I’m just a product of late-night coding.",
        "Apparently, I’m supposed to explain Nima’s stuff.",
      ],
      [
        "Who am I? Just a little experiment in pixels.",
        "Let me know if you want to hear about Nima’s work.",
      ],
      [
        "Oh, I’m just a little guy made for this page.",
        "I can tell you about Nima if you're interested.",
      ],
      [
        "I’m just a pixel dude living in a digital world.",
        "Nima put me here to talk about cool stuff. Interested?",
      ],
    ],
    options: [{ label: "Go back", nextState: "intro" }],
  },
  education: underDev,
  projects: underDev,
  experience: underDev,
  personal: underDev,
};

export default dialogues;
