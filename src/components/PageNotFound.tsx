import { Link } from 'react-router';
import { ContentBox } from './ContentBox';

export const PageNotFound = () => (
  <ContentBox title="Page Not Found" variant="filled">
    <div className="mb-8">Whoops! There's nothing here.</div>

    <Link to="/">Back to your Colony</Link>
  </ContentBox>
);
