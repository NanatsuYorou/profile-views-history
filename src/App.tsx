import './App.css';
import History from './pages/History';
import data from './data/views';
import { ViewMockedInfo } from './types/interfaces';
import mockViews from './utils/mockViews';

const App = () => {
    const mockedData: ViewMockedInfo = mockViews(data);
    const dateList: string[] = Object.keys(mockedData);

    return (
        <div>
            <div className={'wrapper'}>
                <h1>Просмотры резюме</h1>
                <History dateList={dateList} mockedData={mockedData} />
            </div>
        </div>
    );
};

export default App;
