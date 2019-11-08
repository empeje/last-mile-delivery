import app from "./app";
import { BACKEND_PORT } from "./config";

app.listen(BACKEND_PORT, () => {
  console.log(`Server is running on port ${BACKEND_PORT}`);
});
