import path from "path";
import fs from "fs";

export const deleteLocals = async (arrPaths) => {
  const delLocalPromises = arrPaths.map(async (pathEl) => {
    const localPath = path.resolve(pathEl);

    try {
      if (fs.existsSync(localPath)) {
        await fs.promises.unlink(localPath);
        console.log("=> deleted locally");
      } else {
        console.log(`=> img not found ${localPath}`);
      }
    } catch (err) {
      console.dir(`=> error deleting local path ${localPath}`, err);
    }
  });

  await Promise.all(delLocalPromises);
};
