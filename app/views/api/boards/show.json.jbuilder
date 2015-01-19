# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list
#       @board = Board.includes(:members, lists: :cards).find(params[:id])
json.title @board.title

json.members @board.members, :email

json.lists @board.lists do |list|
  json.id list.id
  json.title list.title
  json.ord list.ord
  json.updated_at list.updated_at
  json.cards list.cards do |card|
    json.id card.id
    json.title card.title
    json.ord card.ord
    json.updated_at card.updated_at
    json.description card.description
  end
end
