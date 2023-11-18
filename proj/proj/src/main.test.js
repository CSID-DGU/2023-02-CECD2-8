import { render, screen } from '@testing-library/react';
import Mainpage from './mainpage'; // Mainpage 컴포넌트를 가져옵니다.

test('renders Mainpage component', () => {
  render(<Mainpage />); // Mainpage 컴포넌트를 렌더링합니다.
  // 여기서 특정 요소나 콘텐츠의 존재 여부를 확인할 수 있습니다.
  const headerElement = screen.getByText(/로그인/i); // "로그인" 텍스트의 존재 여부를 확인합니다.
  const logoElement = screen.getByAltText('logo'); // 로고 이미지의 alt 속성을 통해 로고 이미지의 존재 여부를 확인합니다.

  // 요소가 문서에 존재하는지 단언합니다.
  expect(headerElement).toBeInTheDocument();
  expect(logoElement).toBeInTheDocument();
});