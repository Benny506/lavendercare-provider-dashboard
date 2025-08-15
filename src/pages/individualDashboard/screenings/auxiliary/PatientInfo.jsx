export default function PatientInfo({ patient }){

    if(!patient) return <></>

    const { 
        name, email, age, is_pregnant, postpartumDay,
        pregnant_months_count, weight, height, country, state: mothersState, profile_img,
        is_first_child, num_kids, is_home_mum, registered_antenatal,
    } = patient

    return(
        <>
            <div>
                <h2 className="text-lg font-bold mb-4">Patient Information</h2>
                <div className="space-y-3 mb-8 text-sm">
                    {
                        [
                            { title: "Age", value: age },
                            { title: "Weight", value: weight ? `${weight}kg` : "not set" },
                            { title: "Height", value: height ? `${height}ft` : "not set" },
                            { title: "Contact", value: email },
                            { title: "Country", value: country },
                            { title: "State", value: mothersState },
                            { title: "Works from home", value: is_home_mum ? 'YES' : "NO" },
                        ].map((info, i) => {
                            const { title, value } = info

                            return(
                                <div key={i}>
                                    <span className="font-medium text-gray-600">{title}: </span>
                                    <span className="font-bold">{value || "not set"}</span>
                                </div>                                     
                            )
                        })                           
                    }                                                                     
                </div>
            </div>

            <hr className="border-gray-200 mt-8 mb-8" />

            <div>
                <h2 className="text-lg font-bold mb-4">Pregnancy Information</h2>
                <div className="space-y-3 mb-8 text-sm">
                    {
                        [
                            { title: "Pregnancy Status", value: is_pregnant ? 'Pregnant' : "PostPartum" },
                            { title: is_pregnant ? "Pregnant months count" : "Postpartum Day", value: is_pregnant ? pregnant_months_count || 'not set' : postpartumDay || 'not set' },
                            { title: "Number of children", value: num_kids ?? "not set "},
                            { title: "Registered Antenatal", value: registered_antenatal ? "YES" : "NO" }
                        ].map((info, i) => {
                            const { title, value } = info

                            return(
                                <div key={i}>
                                    <span className="font-medium text-gray-600">{title}: </span>
                                    <span className="font-bold">{value || "not set"}</span>
                                </div>                                     
                            )
                        })                           
                    }                                                                     
                </div>
            </div>
        </>        
    )
}