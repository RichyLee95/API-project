import SpotForm from "./SpotForm";

const CreateSpotForm = () => {
   const spot = {
        country:'',
        address:'',
        city:'',
        state:'',
        lat:'',
        lng:'',
        description:'',
        price:'',
        name:'',
        preview:'',

    }
    return (
        <SpotForm
        spot={spot}
        formType="Create Spot"
        />
    )
}
export default CreateSpotForm