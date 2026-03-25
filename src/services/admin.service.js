export async function getAllTodosService(){
  return await Todo.findAll( {order: [["id", "ASC"]]});
}
