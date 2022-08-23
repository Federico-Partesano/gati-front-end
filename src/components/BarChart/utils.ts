export const getFamilyBranches = (branches: string[]) => {
  let output: { key: number; parent?: number; name: string, nameBranch: string, sourceName: string }[] = [];
  output.push({ key: 0, name: "main", nameBranch: "main", sourceName: "main" });

  let incrementalKey = 1;
  let savedBranches: Record<string, { key: number }> = {};
  branches.forEach((name) => {
    if (name === "main") return;
    if (name.split("/").length === 3) {
      const [_, sourceName, nameBranch] = name.split("/");
      const sourceBranch = output
        .filter(
          ({ name: nameBranch }) =>
            nameBranch.split("/").length === 3 || nameBranch === "main"
        )
        .find(
          ({ name: nameBranch }) =>
            nameBranch.split("/")[1] === sourceName || nameBranch === sourceName
        );

      const keyBranch = nameBranch in savedBranches ? savedBranches[nameBranch].key : null;

      incrementalKey++;
      if (sourceBranch) {
        return output.push({
          key: keyBranch || incrementalKey,
          parent: sourceBranch.key,
          name,
          sourceName,
          nameBranch, 
        });
      } else {
        incrementalKey++;
        savedBranches[sourceName] = { key: incrementalKey - 1 };
        console.log("savedBranches", savedBranches);
        return output.push({
          key: keyBranch || incrementalKey,
          parent: incrementalKey - 1,
          name,
          sourceName,
          nameBranch, 
        });
      }
    } else {
        incrementalKey++;
        return output.push({
            key: incrementalKey,
            name,
            sourceName: name,
            nameBranch: name, 
          });  
    }
  });
  return output;
};
