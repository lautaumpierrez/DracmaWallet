const wait = (cb: () => void, miliseconds: number): void => {
  setTimeout(cb, miliseconds);
};

export default wait;
