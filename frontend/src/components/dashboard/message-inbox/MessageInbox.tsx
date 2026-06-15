import React from 'react';
import { Mail, Inbox } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCard, Message } from './MessageCard';

interface Props {
  messages: Message[];
  onDelete: (id: string) => void;
  onToggleReply: (id: string) => void;
}

export const MessageInbox: React.FC<Props> = ({ messages, onDelete, onToggleReply }) => {
  const unreadCount = messages.filter(msg => !msg.isReplied).length;

  return (
    <div className="space-y-6 animate-fade-in transition-smooth text-foreground">
      
      {/* Inbox Header Section */}
      <div className="flex justify-between items-center bg-card p-6 rounded-2xl border border-border/50 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">Message Inbox</h3>
            <p className="text-sm text-muted-foreground">Manage messages from your portfolio visitors.</p>
          </div>
        </div>
        
        {/* Unread Counter Badge */}
        <div className="flex items-center gap-2 bg-muted/30 px-4 py-2 rounded-lg border border-border/50">
          <span className="text-sm font-semibold text-muted-foreground">Total: {messages.length}</span>
          <div className="w-px h-4 bg-border mx-1"></div>
          <Badge variant={unreadCount > 0 ? "default" : "secondary"} className={unreadCount > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-muted text-muted-foreground"}>
            {unreadCount} New
          </Badge>
        </div>
      </div>

      {/* Empty State */}
      {messages.length === 0 && (
        <Card className="border-2 border-dashed border-border/50 bg-muted/10 shadow-none">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-4">
              <Inbox className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Your inbox is empty</h3>
            <p className="text-muted-foreground max-w-sm">When visitors contact you through your portfolio, their messages will appear here.</p>
          </CardContent>
        </Card>
      )}

      {/* Messages List */}
      <div className="grid gap-5">
        {messages.map((msg) => (
          <MessageCard 
            key={msg._id} 
            msg={msg} 
            onDelete={onDelete} 
            onToggleReply={onToggleReply} 
          />
        ))}
      </div>
    </div>
  );
};

export default MessageInbox;