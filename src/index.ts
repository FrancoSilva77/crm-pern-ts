import colors from 'colors'
import server from "./server";

const port = process.env.PORT || 4000

server.listen(4000, ()=> {
  console.log(colors.white.bold(`Rest Api en el puerto ${port}`));
  
})