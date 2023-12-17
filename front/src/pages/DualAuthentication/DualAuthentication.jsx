import { useEffect, useState } from "react"
import instanceAxios from "../../helpers/axiosInstance"
import { useUser } from "../../providers/UserContext"
import { useNavigate } from "react-router-dom"
import './DualAuthentication.scss'

function DualAuthentication() {
    const navigate = useNavigate()
    const [qrcode, setQrcode] = useState(null)
    const { user } = useUser();
    const [token, setToken] = useState('')
    if(!user){
        navigate('/')
      }

    const extractNumbers = (str) => {
        const numberPattern = /\d+/g;
        const numbersOnly = str.match(numberPattern);
        if (numbersOnly) {
          return numbersOnly.join('');
        }
        return '';
      };
      
      const handleTokenChange = (event) => {
        const token = event.target.value;
        const onlyNumbers = extractNumbers(token);
        setToken(onlyNumbers);
      };

    const handleVerify = () => {
        instanceAxios.get(`http://localhost:3000/a2f/verify?user=${user._id}&token=${token}`).then(response => {
            if (response.data.isValid) {
                navigate('/')
            }
        })
    }

    useEffect(() => {
        const getQrcode = async () => {
            const qrcode = await instanceAxios.get(`http://localhost:3000/a2f/qrcode?user=${user._id}`)
            setQrcode(qrcode.data.url)
        }

        getQrcode()
    }, [])

    return (
        <>
            <div className="dualAuthentication">
                <div className="title">
                    <h1>Scannez le code QR avec une application</h1>
                    <p>prennant en charge l&apos;authentification à deux facteurs</p>
                </div>
                <div className="qrcode">
                    {qrcode && (
                        <img src={qrcode} />
                    )}
                </div>
                <div className="title verification">
                    <h1>Entrez le code de vérification</h1>
                    <p>fournit par l&apos;application à deux facteurs</p>
                </div>
                <div className="code">
                    <input type="text" placeholder="Code à 6 chiffres..." value={token} onChange={handleTokenChange} />
                    <button className="config-btn" onClick={handleVerify}>Activer l&apos;authentification à double facteur</button>
                </div>
            </div>
        </>
    )
}

export default DualAuthentication