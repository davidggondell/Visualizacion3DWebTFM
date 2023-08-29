import LZString from "lz-string";

export const getMyClusters = () => {
  try {
    const saved = window.localStorage.getItem("myClusters");
    const json = JSON.parse(saved);

    if (json) {
      return json;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const addCluster = async (name, cluster, onSuccess, onFailure) => {
  try {
    const json = getMyClusters();
    if (json && json.length > 0) {
      const greatestId = json[0].id;
      const serializedData = JSON.stringify([
        { id: greatestId + 1, name: name, data: LZString.compress(cluster) },
        ...json,
      ]);
      window.localStorage.setItem("myClusters", serializedData);
    } else {
      const serializedData = JSON.stringify([{ id: 1, name: name, data: LZString.compress(cluster) }]);
      window.localStorage.setItem("myClusters", serializedData);
    }
    onSuccess();
  } catch (error) {
    onFailure(error);
  }
};

export const removeCluster = async (id, onSuccess, onFailure) => {
  try {
    const json = getMyClusters();
    if (json) {
      const jsonWithoutFile = json.filter((item) => item.id != id);
      const serializedData = JSON.stringify(jsonWithoutFile);
      window.localStorage.setItem("myClusters", serializedData);
    } else {
      onFailure("");
    }
    onSuccess();
  } catch (error) {
    onFailure(error);
  }
};

export const getLocalStorageUsage = () => {
  let totalSpace = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const itemSize = key.length + value.length * 2;

    totalSpace += itemSize;
  }
  return totalSpace;
};

export const getInstructionsUsed = () => {
  return window.localStorage.getItem("instructionsUsed") === "";
};

export const setInstructionsUsed = () => {
  if (!getInstructionsUsed()) {
    window.localStorage.setItem("instructionsUsed", "");
  }
};
