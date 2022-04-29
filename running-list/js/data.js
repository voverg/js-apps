const tasks = [
  {
    id: 1,
    title: 'Тестовая задача',
    category: 'тестовая',
    status: {
      mon: 'transfer',
      tue: 'empty',
      wen: 'new',
      thu: 'doing',
      fri: 'empty',
      sat: 'empty',
      sun: 'important',
    },
  },
  {
    id: 2,
    title: 'Купить батон колбасы',
    category: 'home',
    status: {
      mon: 'empty',
      tue: 'empty',
      wen: 'cancel',
      thu: 'doing',
      fri: 'empty',
      sat: 'done',
      sun: 'empty',
    },
  },
];

const category = {
  red: 'тестовая',
  lightblue: 'home',
};

const status = {
  empty: ' ',
  new: 'app__task-day--new',
  transfer: 'app__task-day--transfer',
  doing: 'app__task-day--doing',
  done: 'app__task-day--done',
  important: 'app__task-day--important',
  cancel: 'app__task-day--cancel',
};
