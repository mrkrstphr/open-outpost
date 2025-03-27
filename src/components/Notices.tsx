import { useMemo } from 'react';
import { useNotices } from '../hooks/useNotices';
import { Box } from './Box';
import { ButtonLink } from './Button';
import { ContentBox } from './ContentBox';

export default function Notices() {
  const notices = useNotices();

  const orderedNotices = useMemo(() => [...notices].reverse(), [notices]);

  return (
    <ContentBox
      title="Notices"
      classNames={{ body: 'flex flex-col space-y-1' }}
      variant="filled"
      action={
        <ButtonLink to="/" variant="outline">
          Close
        </ButtonLink>
      }
    >
      {orderedNotices.reverse().map((notice, index) => (
        <Box key={`notice-${index}`}>
          <div className="text-sm text-stone-400">@{notice.mark}</div>
          <div>{notice.message}</div>
        </Box>
      ))}
    </ContentBox>
  );
}
