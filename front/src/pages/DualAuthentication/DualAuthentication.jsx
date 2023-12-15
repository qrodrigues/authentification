import { useEffect, useState } from "react"
import instanceAxios from "../../helpers/axiosInstance"
import { useUser } from "../../providers/UserContext"
import { useNavigate } from "react-router-dom"

function DualAuthentication () {
    const navigate = useNavigate()
    const [qrcode, setQrcode] = useState(null)
    const { user } = useUser();

    const [token, setToken] = useState('')
    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    const handleVerify = () => {
        instanceAxios.get(`http://localhost:3000/account/a2f/verify?user=${user._id}&token=${token}`).then(response => {
            if (response.data.isValid) {
                navigate('/dashboard')
            }
        })
    }

    useEffect(() => {
        const getQrcode = async () => {
            const qrcode = await instanceAxios.get(`http://localhost:3000/account/a2f/qrcode?user=${user._id}`)
            setQrcode(qrcode.data.url)
        }

        getQrcode()
    }, [])

    return (
        <>
            <h1>DualAuthentication</h1>
            {qrcode && (
                <img src={qrcode} />
            )}
            <br />
            <label>Code de vérification</label>
            <br />
            <input type="text" value={token} onChange={handleTokenChange} />
            <br />
            <button onClick={handleVerify}>Activer l&apos;authentification à double facteur</button>
        </>
    )
}

export default DualAuthentication