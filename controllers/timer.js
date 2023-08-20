export default function timer(start, end) {
  return (new Date(end) - new Date(start)) / 1000;
}
