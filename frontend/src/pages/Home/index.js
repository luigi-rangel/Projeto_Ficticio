import SignUp from '../../SignUp';
import SignIn from '../../SignIn';

export default function Home() {
    return (
        <>
            <div className="grid">
                <SignUp/>
                <SignIn/>
            </div>
        </>
    );
};