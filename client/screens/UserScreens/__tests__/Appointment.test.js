import { addNum } from "../random";
import renderer from 'react-test-renderer';
import { getFinalres } from "../random";



test('return a result', () => {
  expect(getFinalres().length).toBeGreaterThan(0);
  });

test('renders correctly', () => {
  const tree = renderer.create(<MyComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});