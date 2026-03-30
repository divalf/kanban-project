import React from "react";
import { Mail, ShieldCheck, Database, Zap } from "lucide-react";

export function SettingsView() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">Configurações Gerais</h1>
        <p className="text-gray-500 mt-2 text-sm">Gerencie automações, integrações e permissões da plataforma.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Supabase Config */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6 flex flex-col items-start transition-all hover:shadow-md">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
            <Database size={24} />
          </div>
          <div className="space-y-2 w-full">
            <h3 className="font-bold text-lg text-gray-900">Banco de Dados e API</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Conecte sua conta do Supabase para salvar cards, atualizar colunas, gerenciar autenticação e acionar webhooks da automação.</p>
          </div>
          <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors font-semibold text-sm w-full md:w-auto shadow-sm shadow-indigo-200">
            Conectar Backend (Em Breve)
          </button>
        </div>

        {/* E-mail Automation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6 flex flex-col items-start transition-all hover:shadow-md">
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center font-bold">
            <Mail size={24} />
          </div>
          <div className="space-y-2 w-full">
            <h3 className="font-bold text-lg text-gray-900">Configuração de E-mails</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Configure as credenciais SMTP ou os provedores via API (Grid, Resend, Gmail) para habilitar o envio dos relatórios periódicos dos cards.</p>
          </div>
          <button className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white rounded-xl transition-colors font-semibold text-sm w-full md:w-auto shadow-sm">
            Configurar Remetente
          </button>
        </div>

        {/* Triggers */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6 flex flex-col items-start transition-all hover:shadow-md">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center font-bold">
            <Zap size={24} />
          </div>
          <div className="space-y-2 w-full">
            <h3 className="font-bold text-lg text-gray-900">Eventos de Notificação</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Defina quais movimentos do Kanban acionarão a notificação ao cliente. Por padrão, em "Revisão" e "Concluído" notificam ativamente os envolvidos.</p>
          </div>
          <div className="w-full flex items-center gap-4 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="rev" className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300" defaultChecked />
              <label htmlFor="rev" className="text-gray-700 cursor-pointer">Em Revisão</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="done" className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300" defaultChecked />
              <label htmlFor="done" className="text-gray-700 cursor-pointer">Concluído</label>
            </div>
          </div>
        </div>

        {/* Integrations & Security */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6 flex flex-col items-start transition-all hover:shadow-md">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center font-bold">
            <ShieldCheck size={24} />
          </div>
          <div className="space-y-2 w-full">
            <h3 className="font-bold text-lg text-gray-900">Segurança de Acesso</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Gerencie níveis de acesso na plataforma. Quem tem permissão de adicionar cards, quem pode mover tarefas ou quem acessa logs do servidor de e-mail.</p>
          </div>
          <button className="px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-semibold text-sm w-full md:w-auto">
            Verificação de Logs
          </button>
        </div>
      </div>
    </div>
  );
}
