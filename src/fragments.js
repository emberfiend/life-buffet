<div class="ui mini horizontal divided list">
  {renderedTags}
</div>



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
