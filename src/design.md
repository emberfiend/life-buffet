# ?

informational popover explaining the point of the tool

# the path

arrange and resize as desired
visual / layout focus here.. get funky with snapping?
can delete from here
"laying down along the path" vs "keeping for interest" distinction
"save" exports your list as json (no brittle binding to pool contents, as delights are copied wholesale into the path. edge case: you might end up with items on your path which aren't in the pool)

# the pool

filter by tag (include & exclude); filter by name (search)
pre-populated by me (persisted option to exclude default pool)
"save" exports your pool as json
can add extension files by URL, and they are persisted: URL goes into localstorage, when page is reloaded they are re-fetched and merged with pool
randomize/shuffle?? discovery??

# capture interface

needs to handle image "uploads"...?
for the sake of shareability & not dealing with image hosting, need to only concern ourselves with URLs to already-hosted images
find ten candidate images automatically via embeddable image search api, let the user pick one?

..

a delight has a name, description, and list of categorizational tags
all persistence in localstorage for now

search term randomizer
hide own path
personal notes on each item (within the path)
personal categorization - only via tag edits??
import pack list - manage packs? retain via tag identity probably
use general-purpose two-pane manager, where selection just adds the top-searched tag to the clicked item
