import { useDispatch, useSelector } from "react-redux";
import { themeAction } from "../../store/theme";
import { Button } from "react-bootstrap";

const PremiumFeatures = () =>{
    const dispatch = useDispatch();
    const mode = useSelector(state => state.theme.mode)
    const expense = useSelector(state => state.expenses.expenses)

    const toggleHandler = () =>{
        dispatch(themeAction.switchTheme());
    }

    // const blob = new Blob([expense]);
    // const url = URL.createObjectURL(blob);

    const convertToCSV  = (data) => {
        return data.map(expense => Object.values(expense).join(",")).join("\n");
    }
    const downloadHandler = ()=>{
        const csv = convertToCSV(expense)
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'expenses.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return(
        <div className="d-flex  justify-content-center ">
            <Button variant="dark" onClick={toggleHandler} className="me-3">
                {mode ? "Switch to Dark Theme" : "Switch to light Theme"}
                </Button>
            <Button variant="primary" onClick={downloadHandler} >Download File</Button>
        </div>
    )
}

export default PremiumFeatures;