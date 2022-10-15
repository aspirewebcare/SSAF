export const FilterData = (allData, bySearch = []) => {
  let finalFilter = [];
  for (let i = 0; i < bySearch.length; i++) {
    const element = bySearch[i];
    let data = i === 0 ? allData : [...finalFilter];
    let done = data.filter((singleData) => {
      if (element.text === "") {
        return singleData;
      } else {
        if (singleData[element.search] === undefined) return true;
        return singleData[element.search]
          .toLowerCase()
          .includes(element.text.toLowerCase());
      }
    });
    finalFilter = [...done];
  }
  return [...finalFilter];
};
