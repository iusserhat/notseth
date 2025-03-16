import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import { NOTION_ABI, NOTION_ADDRESS } from './constant';

// TypeScript için window.ethereum tanımı
declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [nots, setNots] = useState<any[]>([]);
  const [newnots, setNewNots] = useState('');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [notSayisi, setNotSayisi] = useState<number>(0);

  const getContract = async (needSigner = false) => {
    if (!window.ethereum) {
      throw new Error('Metamask bulunamadı');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    if (needSigner) {
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      return new ethers.Contract(NOTION_ADDRESS, NOTION_ABI, signer);
    }

    return new ethers.Contract(NOTION_ADDRESS, NOTION_ABI, provider);
  };

  // Cüzdan bağlantısı
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('Lütfen Metamask yükleyin!');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      return true;
    } catch (error) {
      console.error('Cüzdan bağlantı hatası:', error);
      return false;
    }
  };

  //Notları yükleme 
  const loadNots = async () => {
    try {
      const contract = await getContract();
      const allNots = await contract.tumNotlariGetir();
      
      // Notları formatlayıp state'e kaydet
      const formattedNots = allNots.map((not: any) => {
        return {
          yazar: not.yazar,
          icerik: not.not,
          zaman: new Date(not.zamanDamgasi.toNumber() * 1000).toLocaleString()
        };
      });
      
      setNots(formattedNots);
      setNotSayisi(formattedNots.length);
      
      // Toplam not sayısını da kontrat üzerinden al
      const toplamSayi = await contract.toplamNotSayisi();
      setNotSayisi(toplamSayi.toNumber());
    } catch (err) {
      console.error("Notlar yüklenirken hata oluştu:", err);
    }
  };

  //Not ekleme fonksiyonu
  const addNot = async () => {
    if (!newnots.trim()) {
      return;
    }

    try {
      const contract = await getContract(true);
      const tx = await contract.NotEkle(newnots);
      
      // İşlem onaylanana kadar bekle
      await tx.wait();
      
      // Notları yeniden yükle
      await loadNots();
      
      // Formu temizle
      setNewNots('');
    } catch (err) {
      console.error("Not eklenirken hata oluştu:", err);
    }
  };

  // Sayfa yüklendiğinde
  useEffect(() => {
    const init = async () => {
      const connected = await connectWallet();
      if (connected) {
        await loadNots();
      }

      // Hesap değişikliklerini dinle
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          setWalletAddress(accounts[0] || null);
          loadNots();
        });

        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });
      }
    };

    init();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>NOTION</h1>
        {walletAddress ? (
          <p className="wallet">
            Cüzdan: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
        ) : (
          <button onClick={connectWallet} className="connect-btn">
            Cüzdanı Bağla
          </button>
        )}
      </header>

      {walletAddress && (
        <div className="not-container">
          <div className="not-form">
            <input
              type="text"
              value={newnots}
              onChange={(e) => setNewNots(e.target.value)}
              placeholder="Yeni not ekle..."
              className="not-input"
            />
            <button onClick={addNot} className="add-btn">
              Ekle
            </button>
          </div>

          <div className="not-list">
            <div className="not-header">
              <h2>Notlarım</h2>
              <span className="not-count">Toplam Not Sayısı: {notSayisi}</span>
            </div>
            {nots.length === 0 ? (
              <p>Henüz not eklenmemiş.</p>
            ) : (
              nots.map((not, index) => (
                <div key={index} className="not-item">
                  <p className="not-content">{not.icerik}</p>
                  <div className="not-meta">
                    <span className="not-author">
                      Yazar: {not.yazar.slice(0, 6)}...{not.yazar.slice(-4)}
                    </span>
                    <span className="not-time">{not.zaman}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
