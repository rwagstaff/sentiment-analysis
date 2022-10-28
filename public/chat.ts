export interface IPerson {
  personName: string;
}

export interface IChatMessage extends IPerson {
  date: string;
  sentence: string;
}

export interface IPersonChat extends IPerson {
  sentences: string[];
}


function groupBy(list: Array<any>, key: string) {
  const map = new Map();
  list.forEach((item) => {
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

