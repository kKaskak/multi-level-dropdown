import { DropdownMenu } from './common';
import { multiLevel } from './data';

const App = () => {

    const defaultOption = multiLevel.find((item) => item.default)?.label || '';

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
            {/* <DropdownMenu options={singleLevel} /> */}
            <DropdownMenu options={multiLevel} defaultOption={defaultOption} />
        </div>
    );
}

export default App;
