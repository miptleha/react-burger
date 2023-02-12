import IngredientDetails from '../components/ingredient-details/ingredient-details';
import './pages.css';

function IngredientPage() {
    return (
        <main className="page-container">
            <div className="page-container-inner">
                <IngredientDetails />
            </div>
        </main>
    );
}

export default IngredientPage;