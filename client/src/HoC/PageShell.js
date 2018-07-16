import { compose } from 'redux';
import { GameStatusHoC } from './GameStatus';
import { PageAnimationHoC } from './PageAnimationHoC';

export const PageShellHoC = compose(GameStatusHoC, PageAnimationHoC);
export default PageShellHoC;
