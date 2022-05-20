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
