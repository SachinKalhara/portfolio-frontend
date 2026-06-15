import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, MailOpen, Reply, Trash2 } from 'lucide-react';

export interface Message {
  _id: string; name: string; email: string; message: string; date: string; isReplied: boolean;
}

interface Props {
  msg: Message;
  onDelete: (id: string) => void;
  onToggleReply: (id: string) => void;
}

export const MessageCard: React.FC<Props> = ({ msg, onDelete, onToggleReply }) => {
  const getInitials = (name: string) => name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
  
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
  });

  return (
    <Card className={`overflow-hidden transition-smooth hover:shadow-md border-l-4 shadow-soft ${
      msg.isReplied ? 'border-l-green-500 bg-muted/20' : 'border-l-blue-600 bg-card'
    }`}>
      <CardContent className="p-0">
        
        {/* Message Header */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 ${
              msg.isReplied ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'
            }`}>
              {getInitials(msg.name)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                {msg.name}
                {msg.isReplied ? (
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 h-5 text-[10px] uppercase">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Replied
                  </Badge>
                ) : (
                  <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-none h-5 text-[10px] uppercase shadow-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5 animate-pulse" /> New
                  </Badge>
                )}
              </h3>
              <a href={`mailto:${msg.email}`} className="text-sm text-blue-500 hover:underline inline-flex items-center mt-0.5">
                {msg.email}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full w-fit">
            <Clock className="w-3.5 h-3.5" />{formatDate(msg.date)}
          </div>
        </div>

        {/* Message Body */}
        <div className="p-5 md:p-6">
          <div className="bg-background p-5 rounded-xl border border-border/50 text-muted-foreground text-[15px] leading-relaxed whitespace-pre-wrap">
            {msg.message}
          </div>
        </div>

        {/* Message Actions */}
        <div className="px-5 pb-5 pt-1 flex flex-wrap items-center justify-end gap-3">
          <Button variant="outline" size="sm" className="bg-background hover:bg-muted font-medium border-border/50 transition-colors" onClick={() => window.open(`mailto:${msg.email}?subject=Reply to your message from Portfolio`, '_blank')}>
            <Reply className="mr-2 h-4 w-4 text-blue-500" /> Reply via Email
          </Button>
          <Button variant={msg.isReplied ? "secondary" : "default"} size="sm" className={msg.isReplied ? "bg-muted text-foreground font-medium hover:bg-muted/80" : "bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm"} onClick={() => onToggleReply(msg._id)}>
            {msg.isReplied ? <><MailOpen className="mr-2 h-4 w-4" /> Mark as Unread</> : <><CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Replied</>}
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:bg-destructive/10 rounded-md" onClick={() => { if (window.confirm('Are you sure you want to delete this message?')) onDelete(msg._id); }} title="Delete Message">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};