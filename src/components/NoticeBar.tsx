import { useNotices } from '../hooks/useNotices';
import { Box } from './Box';
import { ButtonLink } from './Button';

export const NoticeBar = () => {
  const [latestNotice] = useNotices(1);

  return (
    <Box className="mb-1 text-sm">
      {latestNotice ? (
        <div className="flex space-x-1">
          <div className="flex-1 truncate" title={latestNotice.message}>
            @{latestNotice.mark}: {latestNotice.message}
          </div>
          <ButtonLink to="/notices" variant="warning">
            View All
          </ButtonLink>
        </div>
      ) : (
        <>There are no notices.</>
      )}
    </Box>
  );
};
