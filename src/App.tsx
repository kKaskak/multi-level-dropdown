import { DropdownMenu } from './common';
import { multiLevel } from './data';

const App = () => {

    const defaultOption = multiLevel.find((item) => item.default)?.label || '';

    return (
        <div>
            {/* <DropdownMenu options={singleLevel} /> */}
            <DropdownMenu options={multiLevel} defaultOption={defaultOption} />
        </div>
    );
}

export default App;
