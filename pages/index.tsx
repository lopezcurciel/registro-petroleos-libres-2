import { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

export default function Home() {
  const [form, setForm] = useState({
    name: '', dni: '', email: '', phone: '', plates: '', billing: '', acepta: false
  });
  const sigRef = useRef<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.acepta || sigRef.current?.isEmpty()) {
      alert('Debes firmar y aceptar la política de protección de datos');
      return;
    }
    const signature = sigRef.current?.toDataURL();
    await fetch('/api/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, signature })
    });
    alert('¡Registro enviado correctamente!');
    sigRef.current?.clear();
    setForm({ name: '', dni: '', email: '', phone: '', plates: '', billing: '', acepta: false });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold tracking-tight">Petroleos Libres</h1>
          <p className="text-2xl mt-4 opacity-80">Registro rápido para facturación</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <input required placeholder="Nombre o Razón Social" className="w-full p-6 text-2xl rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-white transition" onChange={e => setForm({...form, name: e.target.value})} />
          <input required placeholder="DNI / CIF" className="w-full p-6 text-2xl rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-white transition" onChange={e => setForm({...form, dni: e.target.value})} />
          <input required type="email" placeholder="Email" className="w-full p-6 text-2xl rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-white transition" onChange={e => setForm({...form, email: e.target.value})} />
          <input required placeholder="Teléfono" className="w-full p-6 text-2xl rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-white transition" onChange={e => setForm({...form, phone: e.target.value})} />
          <textarea placeholder="Matrículas (una por línea)" rows={4} className="w-full p-6 text-2xl rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-white transition resize-none" onChange={e => setForm({...form, plates: e.target.value})} />
          
          <select required className="billing" required className="w-full p-6 text-2xl rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-white transition" onChange={e => setForm({...form, billing: e.target.value})}>
            <option value="">Tipo de facturación</option>
            <option>Diaria</option>
            <option>Semanal</option>
            <option>Quincenal</option>
            <option>Mensual</option>
          </select>

          <label className="flex items-center gap-6 text-xl">
            <input type="checkbox" required className="w-8 h-8" onChange={e => setForm({...form, acepta: e.target.checked})} />
            <span>Acepto la <a href="#" className="underline">Política de Protección de Datos</a></span>
          </label>

          <div className="bg-zinc-900 rounded-3xl p-8 border-2 border-zinc-700">
            <p className="text-2xl mb-6 text-center">Firma digital</p>
            <SignatureCanvas ref={sigRef} canvasProps={{ className: 'bg-black border-2 border-white rounded-2xl w-full h-80' }} />
            <button type="button" onClick={() => sigRef.current?.clear()} className="mt-6 w-full py-5 bg-zinc-800 hover:bg-zinc-700 rounded-2xl text-xl font-semibold transition">
              Borrar firma
            </button>
          </div>

          <button type="submit" className="w-full py-8 bg-white text-black text-4xl font-bold rounded-3xl hover:bg-gray-200 transition shadow-2xl">
            ENVIAR Y FIRMAR
          </button>
        </form>
      </div>
    </div>
  );
}
