// deprecated onAdd

/*onAdd = (term, delight) => {
  // this should auto-add the filter term as a tag, if present

  console.log(
    `Item clicked for addition from section with term ${term} (using dummy delight for now).`
  );
  const newDelight = {
    name: 'Dummy',
    description: 'Test',
    imageUrl: 'https://andrewbackhouse.com/res/reeds.jpg',
    tags: ['test', 'test2'],
  };

  if (term.length > 0) {
    if (
      !newDelight.tags.reduce((state, next) => {
        return state || next.includes(term);
      }, false)
    ) {
      newDelight.tags.push(term);
    }
  }

  if (!this.state.poolDelights.some((d) => d.name === newDelight.name)) {
    console.log('Absent from pool delights');

    this.setState((prevState) => ({
      poolDelights: [...prevState.poolDelights, newDelight],
    }));
  }
};*/

// manual json building

/*const newPool = [
  {
    name: 'Draw',
    description: 'Put lines on paper using lead!',
    imageUrls: [
      'https://andrewbackhouse.com/res/reeds.jpg',
      'https://lifebuffet.org/res/skateboard-6518594 on Pixabay.jpg',
    ],
    tags: [
      'indoors',
      'outdoors',
      'creative',
      'solo',
      'cheap',
      'risk-none',
    ],
  },
  {
    name: 'Skateboard',
    description: 'Ride your sweet chrome into the sunset!',
    imageUrls: [
      'https://lifebuffet.org/res/skateboard-6518594 on Pixabay.jpg',
    ],
    tags: ['outdoors', 'skill', 'social', 'solo', 'risk-moderate'],
  },
  {
    name: 'Football / Soccer',
    description: 'Kick balls into nets, and have fun doing it',
    imageUrls: [
      'https://lifebuffet.org/res/soccer-7056003 by Dimitris Vetsikas on Pixabay.jpg',
    ],
    tags: ['outdoors', 'skill', 'social', 'risk-minor'],
  },
];*/

// the TAG ARRAY was the same?!?!

console.log(
  Object.is(this.state.editModalTarget.tags, this.state.poolDelights[0].tags)
);

// before removing editModalIndex

onEditStart = (term, delight) => {
  // this invokes the edit modal, pre-filling fields if we're editing an existing one
  // editModalNew, editModalIndex

  console.log('onEditStart');

  if (delight != null) {
    const targetDelightIndex = this.state.poolDelights.findIndex(
      (d) => d.name == delight.name
    );

    console.log(`Editing existing delight at index ${targetDelightIndex}`);

    this.setState({
      editModalTarget: { ...delight }, // need to edit a copy to allow cancelling
      editModalIndex: targetDelightIndex,
    });
  } else {
    console.log('Editing new delight');
    this.setState({
      editModalTarget: this.makeFreshDelight(term), // already happens
      editModalIndex: -1, // pretty sure I'm not using this anywhere
    });
  }
  this.setState({ editModalShow: true });
};

<div class="ui mini horizontal divided list">{renderedTags}</div>;

// previous onPoolSelect design involving two separate pools
if (!this.state.pathDelights.some((d) => d.name === delight.name)) {
  console.log('Absent from path delights');

  // can't array.push as it modifies in-place
  this.setState((prevState) => ({
    pathDelights: [...prevState.pathDelights, delight],
  }));
}

// splice returns the deleted items, rather than the changed array, so this doesn't work
this.setState((prevState) => ({
  poolDelights: [...prevState.poolDelights].splice(delightIndex, 1, delight),
}));

// old deletion that actually deleted items
onPathDelete = (delight) => {
  console.log(`Path delight ${delight.name} clicked for deletion.`);

  // array.filter returns a newly created array
  this.setState((prevState) => ({
    pathDelights: prevState.pathDelights.filter((d) => d !== delight),
  }));
};
