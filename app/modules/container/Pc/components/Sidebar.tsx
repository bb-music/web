import styles from '../index.module.scss';
import { MusicOrder } from '../../../musicOrderList';
import { type MusicOrderDetailProps } from '../../../';

export function Sidebar({
  gotoMusicOrderDetail,
}: {
  gotoMusicOrderDetail: (opt: MusicOrderDetailProps) => void;
}) {
  return (
    <div className={styles.sidebar}>
      <MusicOrder gotoMusicOrderDetail={gotoMusicOrderDetail} />
    </div>
  );
}
