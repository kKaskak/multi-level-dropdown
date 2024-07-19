import { DropdownMenu } from './common';
import { singleLevel, multiLevel } from './data';

const App = () => {

    return (
        <div>
            {/* <DropdownMenu options={singleLevel} /> */}
            <DropdownMenu options={multiLevel} />
        </div>
    );
}

export default App;
