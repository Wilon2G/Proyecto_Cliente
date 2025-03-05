'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'; //shadcn ui folder
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsImages, BsPaperclip } from 'react-icons/bs';
import { IoSendOutline } from 'react-icons/io5';
import * as z from 'zod';
import { formSchema } from '~/utils/zodSchemas';

export type ContactFormData = z.infer<typeof formSchema>;

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adImage: undefined,
    },
  });

  //Se puede quitar el console.log???
  const onSubmit = async (data: ContactFormData) => {
    console.log(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/**Pq hay un form dentro de Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={cn('flex md:flex-row w-[100%] gap-4 flex-col')}>
            <div className="flex  w-[100%] gap-4 flex-col ">
              <FormLabel>your form title</FormLabel>
              <div
                className={`flex w-[100%] gap-4 p-4 rounded border border-neutral-200 flex-col items-center md:flex-row md:justify-between md:items-center`}
              >
                <div
                  className={`flex  md:flex-[1] h-[fit-content] md:p-4 md:justify-between md:flex-row 
                        
            `}
                >
                  {selectedImage ? (
                    <div className="md:max-w-[200px]">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                      />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-between">
                      <div className="p-3 bg-slate-200  justify-center items-center flex">
                        <BsImages size={56} />
                      </div>
                    </div>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="adImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Button size="lg" type="button">
                          <input
                            type="file"
                            className="hidden"
                            id="fileInput"
                            accept="image/*"
                            onBlur={field.onBlur}
                            name={field.name}
                            onChange={(e) => {
                              field.onChange(e.target.files);
                              setSelectedImage(e.target.files?.[0] || null);
                            }}
                            ref={field.ref}
                          />
                          <label
                            htmlFor="fileInput"
                            className="bg-blue-500 hover:bg-blue-600 text-neutral-90  rounded-md cursor-pointer inline-flex items-center"
                          >
                            <BsPaperclip />
                            <span className="whitespace-nowrap">
                              Choose your image
                            </span>
                          </label>
                        </Button>
                      </FormControl>
                      {/* <FormDescription>This is your public display email.</FormDescription> */}

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className={cn('flex w-[100%] gap-4 justify-end')}>
            <div className="space-y-2">
              <Button className="gap-1 py-4 px-4" type="submit">
                <span>Submit</span>
                <IoSendOutline />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
}
