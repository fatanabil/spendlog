import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <main>
            <h1>THIS IS HOMEPAGE</h1>
            <Link to='/dashboard'>GO TO DASHBOARD</Link>
        </main>
    );
};

export default HomePage;
